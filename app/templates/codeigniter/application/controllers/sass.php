<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Sass extends CI_Controller {

    public function serve($file) {
        $this->load->library('scss');
        $this->scss->serve($file);
    }

}

?>