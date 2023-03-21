<?php

/* Template Name: Team */



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

<!-- bloc-6 -->
<div class="bloc l-bloc" id="bloc-6">
	<div class="container bloc-lg bloc-sm-lg">
		<div class="row">
			<div class="col">
				<h3 class="mb-4">
					Current members
				</h3>
				<div class="row">
					<div class="col-lg-4 col-md-4">
						<div class="card border-0">
							<div class="card-body team-card">
								<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/d622efbb-fdda-451f-91d8-0e27b900b66f.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/d622efbb-fdda-451f-91d8-0e27b900b66f.jpg" class="rounded-circle mx-auto d-block mt-5 img-style mt-lg-2 lazyload" width="100" alt="d622efbb fdda-451f-91d8-0e27b900b66f" height="200"></picture>
								<h4 class="text-center mg-sm">
									Dr. Weiran Zheng
								</h4>
								<h5 class="text-center mg-md">
									Associate Professor of Chemistry
								</h5>
								<div class="row">
									<div class="col-6 col-sm-2 offset-sm-2 col offset-md-1 offset-lg-2">
										<div class="text-center">
											<a href="https://orcid.org/0000-0002-9915-6982" target="_blank"><span class="icon-md fab fa-orcid"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://scholar.google.com.hk/citations?user=hEpBUuYAAAAJ&hl=en" target="_blank"><span class="icon-md ion ion-social-google-outline"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="mailto:weiran.zheng@gtiit.edu.cn"><span class="icon-md li_mail"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://www.researchgate.net/profile/Weiran-Zheng" target="_blank"><span class="icon-md fab fa-researchgate"></span></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 mt-3 mt-md-0">
						<div class="card border-0">
							<div class="card-body team-card">
								<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/WechatIMG171.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/WechatIMG171.jpeg" class="rounded-circle mx-auto d-block mt-5 img-wechatimg1-style mt-lg-2 lazyload" width="100" alt="placeholder user" height="200"></picture>
								<h4 class="text-center mg-sm">
									Jiajing Zhong
								</h4>
								<h5 class="text-center mg-md">
									Research Assistant
								</h5>
								<div class="row">
									<div class="col-6 col-sm-2 offset-sm-2 col offset-md-1 offset-lg-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-facebook-official icon-md"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-twitter icon-md"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-instagram icon-md"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-envelope-o icon-md"></span></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 mt-3 mt-md-0">
						<div class="card border-0">
							<div class="card-body team-card">
								<picture><source type="image/webp" srcset="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-srcset="<?php echo get_template_directory_uri(); ?>/img/WechatIMG109.webp"><img src="<?php echo get_template_directory_uri(); ?>/img/lazyload-ph.png" data-src="<?php echo get_template_directory_uri(); ?>/img/WechatIMG109.jpeg" class="rounded-circle mx-auto d-block mt-5 img-12-style mt-lg-2 lazyload" width="100" alt="placeholder user" height="200"></picture>
								<h4 class="text-center mg-sm">
									Jing Chen
								</h4>
								<h5 class="text-center mg-md">
									Research Assistant
								</h5>
								<div class="row">
									<div class="col-6 col-sm-2 offset-sm-2 col offset-md-1 offset-lg-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-facebook-official icon-md"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-twitter icon-md"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-instagram icon-md"></span></a>
										</div>
									</div>
									<div class="col-6 col-sm-2">
										<div class="text-center">
											<a href="https://blocsapp.com/"><span class="fa fa-envelope-o icon-md"></span></a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<h3 class="mb-4">
					Previous members
				</h3>
			</div>
		</div>
	</div>
</div>
<!-- bloc-6 END -->

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
