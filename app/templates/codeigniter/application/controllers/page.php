<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Page extends CI_Controller
{
    
    public function index() {
        $this->load->library('ua');
        $this->load->helper('url');
        
        $data = array();
        
        if ($this->ua->isTablet()) {
            $data['device'] = 'tablet';
        } else if ($this->ua->isMobile()) {
            $data['device'] = 'mobile';
        } else {
            $data['device'] = 'desktop';
        }
        
        if (ENVIRONMENT === 'development') {
            $this->load->model('scripts');
            $data['app_scripts'] = $this->scripts->all;
        }
        
        $this->load->view('page', $data);
    }
}
?>
