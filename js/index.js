$(function () {
	var $body = $("body");
	var $boutonModeSombre = $("#modeSombre");
	var $boutonImprimer = $("#imprimer");
	var $texteDynamique = $(".texteDynamique");
	var texteMetier = "Informaticienne - cybersécurité";
	var indexLettre = 0;
	var timerEcriture = null;

	function arreterAnimationTexte() {
		if (timerEcriture) {
			clearInterval(timerEcriture);
			timerEcriture = null;
		}
	}

	function lancerAnimationTexte() {
		if (!$texteDynamique.length) {
			return;
		}

		arreterAnimationTexte();
		indexLettre = 0;
		$texteDynamique.text("");

		timerEcriture = setInterval(function () {
			indexLettre += 1;

			if (indexLettre > texteMetier.length) {
				indexLettre = 1;
			}

			$texteDynamique.text(texteMetier.slice(0, indexLettre));
		}, 80);
	}

	function afficherTexteImpression() {
		arreterAnimationTexte();
		$texteDynamique.text(texteMetier);
	}

	lancerAnimationTexte();

	$(window).on("beforeprint", function () {
		afficherTexteImpression();
	});

	$(window).on("afterprint", function () {
		lancerAnimationTexte();
	});

	$boutonModeSombre.on("click", function () {
		var modeSombreActif = $body.toggleClass("dark-mode").hasClass("dark-mode");

		$(this).attr("aria-pressed", String(modeSombreActif));
		$(this).attr(
			"aria-label",
			modeSombreActif ? "Désactiver le mode sombre" : "Activer le mode sombre"
		);
	});

	$boutonImprimer.on("click", function () {
		afficherTexteImpression();
		window.print();
	});
});
