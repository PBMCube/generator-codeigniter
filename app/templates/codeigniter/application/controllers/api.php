<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Api extends CI_Controller {

    function get($model, $function) {
        $this->load->model($model);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode($this->{$model}->{$function}()));
    }

}

?>