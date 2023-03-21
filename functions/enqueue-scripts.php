<?php

/* Theme Scripts
---------------------------------------------------------------------------------------------------- */

function theme_scripts() {

    // Deregister some scripts.
    wp_deregister_script('jquery');
    wp_deregister_script('wp-embed');


	wp_enqueue_script(
		'bootstrap.bundle.min',
		get_template_directory_uri() . '/js/bootstrap.bundle.min.js',
		array(),
		'1819', true
	);

	wp_enqueue_script(
		'blocs.min',
		get_template_directory_uri() . '/js/blocs.min.js',
		array(),
		'1819', true
	);

}
add_action('wp_enqueue_scripts', 'theme_scripts');
