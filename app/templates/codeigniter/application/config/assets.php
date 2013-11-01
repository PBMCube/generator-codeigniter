<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$this->ci = & get_instance();
$this->ci->load->model("quality");

$config["assets_crop_vimeo_thumbs"] = array(
    array("type" => "where", "property" => "type", "value" => "vimeo", "true" => "next"),
    array("type" => "crop", "property" => "vimeo", "true" => array('w' => 450, 'h' => 300), "false" => array('w' => 450, 'h' => 300, "g" => 0))
);

$config["assets_crop_vimeo_large"] = array(
    array("type" => "where", "property" => "type", "value" => "vimeo", "true" => "next"),
    array("type" => "crop", "property" => "vimeo", "true" => array('w' => 1200, 'h' => 800), "false" => array('w' => 1200, 'h' => 800, "g" => 0))
);

$config["assets_thumbs"] = array(
    "q" => $this->ci->config->item("asset_quality"),
    "w" => 450,
    "h" => 300
);

$config["assets_slides"] = array(
    "q" => $this->ci->config->item("asset_quality"),
    "w" => 1350,
    "h" => 900
);

$config["assets_large_thumbs"] = array(
    "q" => $this->ci->config->item("asset_quality"),
    "w" => 750,
    "h" => 500
);

?>