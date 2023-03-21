<?php

/* Template Name: Resource */



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

<!-- bloc-10 -->
<div class="bloc l-bloc" id="bloc-10">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col">
				<h3 class="mb-4">
					Electrochemistry resource
				</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 text-start col-lg-4">
				<h5 class="mb-4 float-lg-none mt-lg-3">
					Basic principles
				</h5>
				<p class="mb-lg-0">
					https://www.ceb.cam.ac.uk/research/groups/rg-eme/research/undergraduate-teaching-notes<br>
				</p>
				<p class="mb-lg-0">
					https://ocw.mit.edu/courses/chemical-engineering/10-626-electrochemical-energy-systems-spring-2014/study-materials/<br>
				</p>
				<p class="mb-lg-0">
					https://sop4cv.com<br>
				</p>
			</div>
			<div class="col-md-3 text-start col-lg-4">
				<h5 class="mb-4 mt-lg-3">
					Analytical methods
				</h5>
				<p class="mb-lg-0">
					https://www.gamry.com/application-notes/<br>
				</p>
				<p class="mb-lg-0">
					https://pineresearch.com/shop/kb/knowledge-category/theory/<br>
				</p>
				<p class="mb-lg-0">
					Allen J. Bard, Larry R. Faulkner, Electrochemical Methods: Fundamentals and Applications<br>
				</p>
			</div>
			<div class="col-md-3 text-start col-lg-4">
				<h5 class="mb-4 mt-lg-3">
					Related journals
				</h5>
				<ul>
					<li>
						<p class="mb-lg-0">
							JACS
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							Nature Energy
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							Current Opinion in Electrochemistry
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							Journal of the Electrochemical Society
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							ACS Energy Letters
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							ACS Catalysis<br>
						</p>
					</li>
				</ul>
			</div>
			<div class="col-md-3 text-start col-lg-4">
				<h5 class="mb-4 mt-lg-3">
					Electrochemistry community
				</h5>
				<ul>
					<li>
						<p class="mb-lg-0">
							The International Society of Electrochemistry
						</p>
					</li>
					<li>
						<p class="mb-lg-0">
							The Electrochemical Society
						</p>
					</li>
				</ul>
				<p>
					<br>
				</p>
			</div>
			<div class="col-md-3 text-start col-lg-4">
				<h5 class="mb-4 mt-lg-3 ">
					Softwares
				</h5>
				<p class="mb-lg-0">
					R-langurage (data process, free)
				</p>
				<p class="mb-lg-0">
					OriginLab (data process, commercial)
				</p>
				<p class="mb-lg-0">
					Fiji of ImageJ2 (image process, free)
				</p>
				<p class="mb-lg-0">
					Blender (structure visualisation, free)
				</p>
				<p class="mb-lg-0">
					VESTA (structure visualisation, free)
				</p>
			</div>
			<div class="col-md-3 text-start col-lg-4">
				<h5 class="mb-4 mt-lg-3">
					Databases
				</h5>
				<p class="mb-lg-0">
					CAS index (journal abbreviation)
				</p>
				<p class="mb-lg-0">
					Crystallography Open Database (free)
				</p>
				<p class="mb-lg-0">
					Material Project (material structure, free)
				</p>
				<p>
					Material Cloud (material structure, free)
				</p>
			</div>
			<div class="col-md-3 text-start col-lg-4 object-hidden">
				<h5 class="mb-4 mt-lg-3">
					Best practice series
				</h5>
			</div>
			<div class="col-md-3 text-start col-lg-4 object-hidden">
				<h5 class="mb-4 mt-lg-3">
					Lectures
				</h5>
				<p class="mb-lg-0">
					Crystallography Open Database (free)
				</p>
				<p class="mb-lg-0">
					Material Project (material structure, free)
				</p>
				<p class="mb-lg-0">
					Material Cloud (material structure, free)
				</p>
			</div>
		</div>
	</div>
</div>
<!-- bloc-10 END -->

<!-- bloc-11 -->
<div class="bloc l-bloc" id="bloc-11">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col">
				<h3 class="mb-4">
					Lab resource <span class="text-grey">- open labware of the ZhengLab</span>
				</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 text-start">
				<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/Screenshot%202022-12-28%20at%206.53.25%20PM.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/Screenshot%202022-12-28%20at%206.53.25%20PM.png" class="img-fluid mx-auto d-block lazyload" alt="Screenshot%202022 12-28%20at%206.53.25%20PM" width="364" height="273"></picture>
				<h5 class="mb-4">
					ITO glass wash stand
				</h5>
				<p>
					https://3dprint.nih.gov/discover/3dpx-018045<br>
				</p>
			</div>
			<div class="col-md-4 text-start">
			</div>
			<div class="col-md-4 text-start">
			</div>
		</div>
	</div>
</div>
<!-- bloc-11 END -->

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
