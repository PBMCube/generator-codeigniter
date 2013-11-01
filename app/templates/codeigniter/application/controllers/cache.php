<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Cache extends CI_Controller {

    public function clear() {
        $this->output->set_output($this->db->cache_delete_all() ? 1 : 0);
    }

}

?>