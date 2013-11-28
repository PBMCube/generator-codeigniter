<?

class Quality extends CI_Model {
    
    function __construct() {
        parent::__construct();
        
        $this->load->config("quality");
        $this->load->library("ua");
        
        if ($this->input->get_post("asset_quality")) {
            $this->config->set_item("asset_quality", $this->input->get_post("asset_quality"));

        } else {
            if ($this->ua->isTablet()) {
                $this->config->set_item("asset_quality", $this->config->item("tablet", "quality"));
                
            } else if ($this->ua->isMobile()) {
                $this->config->set_item("asset_quality", $this->config->item("mobile", "quality"));
                
            } else {
                $this->config->set_item("asset_quality", $this->config->item("default", "quality"));
            }
        }
    }
    
}

?>