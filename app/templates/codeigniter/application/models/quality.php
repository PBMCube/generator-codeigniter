<?

class Quality extends CI_Model {
    
    function __construct() {
        parent::__construct();
        
        $this->load->config("quality");
        $this->load->library("user_agent");
        
        $ua = $this->agent->agent_string();

        $ipad = (bool) stripos($ua, "ipad");
        $iphone = (bool) stripos($ua, "iphone");
        
        if ($ipad) {
            $this->config->set_item("asset_quality", $this->config->item("ipad", "quality"));
            
        } else if ($this->agent->is_mobile()) {
            $this->config->set_item("asset_quality", $this->config->item("mobile", "quality"));
            
        } else {
            $this->config->set_item("asset_quality", $this->config->item("default", "quality"));
        }        
    }
    
}

?>