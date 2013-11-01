<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Scss extends scss_server {

    protected $ci;
    private $scssc;
    private $source = "css/scss";
    private $formatter = "scss_formatter"; // scss_formatter/scss_formatter_nested/scss_formatter_compressed

    function __construct() {
        $this->ci = & get_instance();

        $this->scssc = new scssc();
        $this->scssc->setImportPaths($this->source);
        $this->scssc->setFormatter($this->formatter);

        parent::__construct($this->source, null, $this->scssc);
    }

    public function serve($file) {
        $input = $this->source . "/" . $file;

        if (is_file($input) && is_readable($input)) {
            $output = $this->cacheName($input);
            $this->ci->output->set_content_type('text/css');

            if ($this->needsCompile($input, $output)) {
                try {
                    $this->ci->output->set_output($this->compile($input, $output));
                } catch (Exception $e) {
                    $this->ci->output->set_header('HTTP/1.1 500 Internal Server Error');
                    $this->ci->output->set_output('Parse error: ' . $e->getMessage() . "\n");
                }
            } else {
                $this->ci->output->set_header('X-SCSS-Cache: true');
                $this->ci->output->set_output(file_get_contents($output));
            }

        } else {
            $this->ci->output->set_header('HTTP/1.0 404 Not Found');
            $this->ci->output->set_content_type('text');
            $v = scssc::$VERSION;
            $this->ci->output->set_output("/* INPUT NOT FOUND scss $v */\n");
        }
    }

}

?>