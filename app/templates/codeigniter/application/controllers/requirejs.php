<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Requirejs extends CI_Controller {

    public function main() {
        $this->load->helper('file');

        $scripts = array();

        foreach (array('controllers', 'services', 'filters', 'directives') as $path) {
            foreach (get_filenames('app/scripts/'.$path) as $script) {
                $scripts[$path][] = $path.'/'.str_replace('.js', '', $script);
            }
        }

        $this->output->set_content_type('text/javascript');

        $this->load->view('mainjs', $scripts);
    }

}