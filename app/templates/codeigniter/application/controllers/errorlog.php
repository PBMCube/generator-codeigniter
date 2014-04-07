<?php
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class Errorlog extends CI_Controller
{
    
    var $skip = array(".", "..", ".DS_Store", "index.html");
    
    public function index() {
        if ($this->input->get_post('file')) {
            $this->_view();
        } else {
            $this->_list();
        }
    }
    
    public function _list() {
        $logs = array();
        
        $dir = APPPATH . '/logs';
        
        if (file_exists($dir)) {
            $logs = array_reverse(array_diff(scandir($dir), $this->skip));
        }
        
        $output = '<html><head><title>Logs</title></head><body><ul>';
        
        foreach ($logs as $file) {
            $output.= '<li><a href="/errorlog/?limit=50&file=' . $file . '">' . $file . '</a></li>';
        }
        
        $output.= '</ul></body></html>';
        
        $this->output->set_output($output);
    }
    
    public function _view() {
        $data = array();
        
        $limit = $this->input->get_post("limit") ? $this->input->get_post("limit") : 50;
        
        $dir = APPPATH . '/logs';
        
        $log = $this->_tail($dir . '/' . $this->input->get_post("file"), $limit);
        
        if ($this->input->get_post("reverse")) {
            $log = array_reverse($log);
        }
        
        $output = '<html><head><title>Logs</title></head><body><pre>';
        
        foreach ($log as $line) {
            $output.= $line . '<br />';
        }
        
        $output.= '</pre></body></html>';
        
        $this->output->set_output($output);
    }
    
    private function _tail($filename, $lines = 50) {
        if (!file_exists($filename)) {
            return array("File not found.");
        }
        
        $buffer_size = 1024;
        
        $fp = fopen($filename, 'r');
        if (!$fp) {
            return array();
        }
        
        fseek($fp, 0, SEEK_END);
        $pos = ftell($fp);
        
        $input = '';
        $line_count = 0;
        
        while ($line_count < $lines + 1) {
            
            // read the previous block of input
            $read_size = $pos >= $buffer_size ? $buffer_size : $pos;
            fseek($fp, $pos - $read_size, SEEK_SET);
            
            // prepend the current block, and count the new lines
            $input = fread($fp, $read_size) . $input;
            $line_count = substr_count(ltrim($input), "\n");
            
            // if $pos is == 0 we are at start of file
            $pos-= $read_size;
            if (!$pos) {
                break;
            }
        }
        
        fclose($fp);
        
        // return the last X lines found
        return array_slice(explode("\n", rtrim($input)), -$lines);
    }
}
?>