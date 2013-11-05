<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Geolocation {

    protected $ci;

    public $country_code = "XX";
    public $country = "";
    public $continent_code = "XX";

    function __construct() {
        $this->ci = & get_instance();

        $this->ci->config->load("geolocation", true);

        $countries = $this->ci->config->item("countries", "geolocation");

        if (isset($_SERVER["HTTP_CF_IPCOUNTRY"])) {
            $this->country_code = $_SERVER["HTTP_CF_IPCOUNTRY"];
            $this->country = $countries[$this->country_code]["country"];
            $this->continent_code = $countries[$this->country_code]["continent"];
        }
    }

}

?>