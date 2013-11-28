<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Cms {

    protected $ci;
    public $logged_in = true;

    public $user = null;

    function __construct() {
        $this->ci = & get_instance();

        $this->ci->load->library('session');
        $this->ci->load->library('encrypt');

        $this->logged_in = $this->is_logged_in();
    }

    function is_logged_in() {
        return true;
    }

}

?>