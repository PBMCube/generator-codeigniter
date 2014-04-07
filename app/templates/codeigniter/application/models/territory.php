<?php

class Territory extends CI_Model
{
    
    public $t;
    
    function __construct() {
        parent::__construct();
        
        if (!$this->input->cookie('territory')) {
            if (in_array($this->geolocation->continent_code, array('NA', 'SA'))) {
                $this->set('newyork');
            } else {
                $this->set('london');
            }
        } else {
            $this->t = $this->input->cookie('territory');
        }
    }
    
    function set($territory) {
        $this->t = $territory;
        
        $cookie = array('name' => 'territory', 'value' => $territory, 'expire' => '31557600',
         // 1 yr
        'domain' => '.' . implode('.', array_splice(explode('.', $_SERVER['HTTP_HOST']), 1)), 'path' => '/');
        
        $this->input->set_cookie($cookie);
    }
}
?>