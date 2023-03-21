<?php

/* Template Name: Research */



?><!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<meta name="robots" content="index, follow">
    <link rel="shortcut icon" type="image/png" href="<?php if (get_option('site_icon')){echo get_site_icon_url();}else{ echo get_template_directory_uri().'/favicon.png';}?>">
    
	
    <title><?php the_title(); ?></title>

	<?php wp_head(); ?>

    
<!-- Analytics -->
 
<!-- Analytics END -->
    
</head>
<body class="  <?php echo implode(" ",get_body_class()); ?>">

<!-- Preloader -->
<div id="page-loading-blocs-notifaction" class="page-preloader"></div>
<!-- Preloader END -->


<!-- Main container -->
<div class="page-container">
    
<?php get_header(); ?>

<!-- bloc-3 -->
<div class="bloc l-bloc" id="bloc-3">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col text-start">
				<div class="blockquote">
					<p class="text-justify quotation-style">
						The first principle is that you must not fool yourself—and you are the easiest person to fool. So you have to be very careful about that. After you’ve not fooled yourself, it’s easy not to fool other scientists. You just have to be honest in a conventional way after that. — Richard P. Feynman (1974, Caltech)
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- bloc-3 END -->

<!-- bloc-4 -->
<div class="bloc l-bloc" id="bloc-4">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col-sm-4 col text-start align-self-center">
				<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/frontispiece.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/frontispiece.jpg" class="img-fluid mx-auto d-block lazyload" alt="frontispiece" width="364" height="364"></picture>
			</div>
			<div class="col-sm-8 col text-start">
				<h3>
					In Situ Electrochemistry 原位电化学
				</h3>
				<h4>
					understand real time electrochemistry: seeing is believing
				</h4>
				<p id="-">
					Electrochemical interface is where the electron transfer between electrode/electrocatalyst/electrolyte happens. Understanding the interface reveals the structure-property relationship of electrocatalysts. In situ techniques are useful to study the interface. Our lab focuses on the following techniques: in situ UV-Vis and Raman spectroscopy, Atomic Force Microscopy, and X-ray diffraction.<br>
				</p>
				<h5>
					Topic
				</h5>
				<ul>
					<li>
						<p class="mb-lg-0">
							In situ atomic force microscopy coupled scanning electrochemical microscopy (AFM-SECM) for morphologic and structural detection during electrocatalysis
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							In situ mass spectroscopy for product detection during electrocatalysis
						</p>
					</li>
				</ul>
				<h5>
					Related reading
				</h5>
				<ul>
					<li>
						<p class="mb-lg-0">
							W. Zheng, Chemistry Methods, 2022, e202200042 <a href="https://chemistry-europe.onlinelibrary.wiley.com/doi/epdf/10.1002/cmtd.202200042" target="_blank">link</a>
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							W. Zheng, et al., ACS Energy Letters, 2021, 6, 2838–2843 <a href="https://pubs.acs.org/doi/10.1021/acsenergylett.1c01350" target="_blank">link</a>
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							W. Zheng, et al., ACS Catalysis, 2020, 20, 81–92 <a href="https://doi.org/10.1021/acscatal.9b03790" target="_blank">link</a>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
<!-- bloc-4 END -->

<!-- bloc-5 -->
<div class="bloc l-bloc" id="bloc-5">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col-sm-4 col text-start align-self-center">
				<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/smll202170079-gra-0001-m-2.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/smll202170079-gra-0001-m-2.jpg" class="img-fluid mx-auto d-block lazyload" alt="smll202170079 gra-0001-m-2" width="364" height="364"></picture>
			</div>
			<div class="col-sm-8 col text-start">
				<h3>
					Rational Electrocatalysis Design 电催化剂设计
				</h3>
				<h4>
					develop better catalyst: faster, higher, stronger
				</h4>
				<p id="--45391">
					Electrocatalysts are materials that can promote electrochemical conversion at fix potential. For best efficiency, the materials need to have suitable surface atomic configuration and adorption energy. The best way of achieving this is rational design of active sites. We study the following reactions: carbon dioxide electrochemical adsorption and reduction, electrochemical organic synthesis, and water splitting reaction (or water electrolysis).<br>
				</p>
				<h5>
					Topic
				</h5>
				<ul>
					<li>
						<p class="mb-lg-0">
							Electrochemical synthesis of inorganic materials
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							Single atom catalysts for water splitting reaction, CO2 reduction reaction, biomass conversion
						</p>
					</li>
				</ul>
				<h5>
					Related reading
				</h5>
				<ul>
					<li>
						<p class="mb-lg-0">
							W. Zheng, Analysis & Sensing, 2022, e202200070 <a href="https://doi.org/10.1002/anse.202200070" target="_blank">link</a>
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							W. Zheng, et al., Small, 2021, 17, 2007768 <a href="https://doi.org/10.1002/smll.202007768" target="_blank">link</a>
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							W. Zheng, et al., Nanoscale, 2021, 13, 15177–15187 <a href="https://doi.org/10.1039/D1NR03294A" target="_blank">link</a>
						</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
<!-- bloc-5 END -->

<!-- ScrollToTop Button -->
<button aria-label="Scroll to top button" class="bloc-button btn btn-d scrollToTop" onclick="scrollToTarget('1',this)"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32"><path class="scroll-to-top-btn-icon" d="M30,22.656l-14-13-14,13"/></svg></button>
<!-- ScrollToTop Button END-->


<?php get_footer(); ?>

</div>
<!-- Main container END -->
    
<?php wp_footer(); ?>

<!-- Additional JS -->
<script type='text/javascript' src="<?php echo get_template_directory_uri(); ?>/js/lazysizes.min.js" defer></script>
<!-- Additional JS END -->


</body>
</html>
