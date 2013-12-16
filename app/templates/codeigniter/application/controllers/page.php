<?php

if ( !defined( 'BASEPATH' ) )
    exit( 'No direct script access allowed' );

class Page extends CI_Controller {

    public function index() {
        $this->load->library( 'ua' );
        $this->load->helper( 'url' );

        $data = array();

        $data['title'] = 'Page Title';

        if ( $this->ua->isTablet() ) {
            $data['device'] = 'tablet';

        } else if ( $this->ua->isMobile() ) {
            $data['device'] = 'mobile';

        } else {
            $data['device'] = 'desktop';
        }

        $data['description'] = 'Description...';
        $data['keywords'] = 'Keywords,go,here';

        $this->load->view( 'page', $data );
    }

}

?>
