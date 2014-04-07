<?php
class Scripts extends CI_Model {
    
    public $all = array();
    
    
    function __construct() {
        parent::__construct();
        
        $this->load->helper('file');
        
        foreach (array('controllers', 'services', 'filters', 'directives') as $path) {
            foreach (get_filenames('app/scripts/' . $path) as $script) {
                $this->all[$path][] = $script;
            }
        }
    }
}
