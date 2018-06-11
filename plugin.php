<?php
class FVSPlugin extends SecurePlugin
{
    function get_secure_menu_entries($page, $user)
    {
        $ret = array(
          'Volunteer' => $page->secure_root.'fvs/index.php'
        );
        return $ret;
    }

    function get_plugin_entry_point()
    {
        return array(
          'name'=>'Volunteer',
          'link' => 'fvs/index.php'
        );
    }
}
?>
