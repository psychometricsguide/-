
export const Header = `
<nav class="navbar navbar-expand-lg">
	<div class="container">

		<a class="navbar-brand" href="../home/">
			<img src="../assets/images/Logo.svg" class="rounded-circle" height="40" alt="Logo">
			<span class="title fs-3 ms-md-2 align-middle">PsychoMetricsGuide</span>
		</a>

		<button class="navbar-toggler p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-expanded="false">
			<i class="fa-solid fa-bars fa-lg"></i>
		</button>

		<div class="collapse navbar-collapse justify-content-end" id="navbar">
			<ul class="navbar-nav nav-pills gap-3 text-center pt-3 pt-lg-0 fw-semibold">
				<li class="nav-item">
					<a href="#" class="nav-link muted-color" data-bs-toggle="popover" data-bs-custom-class="info-popover" data-bs-trigger="hover focus" data-bs-placement="bottom" data-bs-content="Currently disabled">
						Surveys
					</a>
				</li>

				<li class="nav-item">
					<a href="#" class="nav-link muted-color" data-bs-toggle="popover" data-bs-custom-class="info-popover" data-bs-trigger="hover focus" data-bs-placement="bottom" data-bs-content="Currently disabled">
						Research
					</a>
				</li>

				<li class="nav-item">
					<a href="#" class="nav-link muted-color" data-bs-toggle="popover" data-bs-custom-class="info-popover" data-bs-trigger="hover focus" data-bs-placement="bottom" data-bs-content="Currently disabled">
						Blog
					</a>
				</li>

				<li class="nav-item">
					<a href="#" class="nav-link muted-color" data-bs-toggle="popover" data-bs-custom-class="info-popover" data-bs-trigger="hover focus" data-bs-placement="bottom" data-bs-content="Currently disabled">
						About
					</a>
				</li>

				<li class="nav-item dropdown d-flex align-items-center justify-content-center">
					<a class="nav-link dropdown-toggle p-0" href="#" data-bs-toggle="dropdown" aria-expanded="false">
						<img id="user-avatar" src="../assets/images/avatars/user-placeholder.webp" class="rounded-circle" height="40" alt="avatar">
					</a>
					<ul class="dropdown-menu dropdown-menu-end px-2">
						<li>
							<a id="user-profile-link" class="dropdown-item rounded-3" href="#">
								<i class="fa-solid fa-user muted-color"></i>
								Profile
							</a>
						</li>
						<li><hr class="dropdown-divider"></li>

						<li>
							<a class="dropdown-item rounded-3" href="../create/post.html">
								<i class="fa-solid fa-newspaper muted-color"></i>
								Create Article
							</a>
						</li>

						<li><hr class="dropdown-divider"></li>
						<li>
							<a class="dropdown-item rounded-3" href="#">
								<i class="fa-solid fa-star muted-color"></i>
								Go Pro
							</a>
						</li>

						<li>
							<a class="dropdown-item rounded-3" href="#">
								<i class="fa-solid fa-heart muted-color"></i>
								My Favorites
							</a>
						</li>

						<li>
							<a class="dropdown-item rounded-3" href="#">
								<i class="fa-solid fa-bell muted-color"></i>
								Notifications
							</a>
						</li>

						<li><hr class="dropdown-divider"></li>
						<li>
							<a class="dropdown-item rounded-3" href="../sign_up/">
								<i class="fa-solid fa-arrow-right-from-bracket muted-color"></i>
								Sign Out
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</nav>
`;
