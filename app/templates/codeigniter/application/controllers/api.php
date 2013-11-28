<?php

if ( !defined( 'BASEPATH' ) )
	exit( 'No direct script access allowed' );

class Api extends CI_Controller {

	function get( $model, $function ) {
		$this->load->library( 'cms' );

		$this->load->driver( 'cache', array( 'adapter' => 'apc', 'backup' => 'file' ) );

		$request = $model . $function . serialize( $this->input->get() ) . serialize( $this->input->post() );

		$hash = md5( $request );

		$data = $this->cache->get( $hash );

		if ( $data === FALSE || ENVIRONMENT === 'development' || $this->cms->logged_in ) {

			$this->load->model( $model );

			$data = json_encode( $this->{$model}->{$function}() );

			$this->cache->save( $hash, $data, 30 * 60 );

		}

		$this->output->set_content_type( 'application/json' );

		$this->output->set_output( $data );

	}

}

?>
