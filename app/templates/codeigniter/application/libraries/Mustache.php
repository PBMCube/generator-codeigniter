<?

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Mustache extends Mustache_Engine {

    protected $ci;

    function __construct() {
        $this->ci = & get_instance();

        parent::__construct(array(
            'loader' => new Mustache_Loader_FilesystemLoader(APPPATH.'views'),
            'partials_loader' => new Mustache_Loader_FilesystemLoader(APPPATH.'views/partials'),
        ));
    }

    public function view($template = '', $data = array()) {
        return $this->ci->output->append_output($this->render($template, $data));
    }

}

?>