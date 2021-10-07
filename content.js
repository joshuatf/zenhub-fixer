/**
 * Repo owner key pair value.
 */
const repos = {};

/**
 * Dynamically injected styles.
 */
const styleElement = document.createElement('style');

/**
 * Listen for the card clicks.
 */
document.addEventListener('click', function(event) {
	if ( event.altKey ) {
		return;
	}

	const card = event.target.closest( '.zhc-issue-card' );
	if ( ! card ) {
		return;
	}

	storeRepos();
	hideUI();
	openIssue( card );
	setTimeout( () => {
		unHideUI();
	}, 1000 );
} );

/**
 * Hide the original
 */
const hideUI = () => {
	var css = '.react-portal-container, .zhc-repo-filter__container .zhc-selection-list-deprecated { display: none !important; }';
	document.head.appendChild(styleElement);
	styleElement.appendChild( document.createTextNode( css ) );
}

/**
 * Unhide the original UI.
 */
const unHideUI = () => {
	document.querySelector( '.zhc-sidebar__flyover-close-target' ).click();
	styleElement.textContent = '';
}

/**
 * Get the repos from the dropdown as repo => owner key value pairs.
 */
const storeRepos = () => {
	const button = document.querySelector( '[data-cy="repo-filter-container"] button' );
	button.click();
	document.querySelectorAll( '.zhc-repo-filter__container .zhc-repo-item__repository' ).forEach( (repo) => {
		repos[ repo.textContent ] = repo.nextSibling.textContent;
	} );
	button.click();
}

/**
 * Open the issue in a new tab given a card element.
 *
 * @param {HTMLElement} card 
 */
const openIssue = ( card ) => {
	const repo = card.querySelector( '.zhc-issue-card__repo-name' ).textContent;
	const number = card.querySelector( '.zhc-issue-card__issue-number' ).textContent.replace( '#', '' );
	const issueUrl = getIssueUrl( repo, number );
	window.open( issueUrl, '_blank' );
}

/**
 * Get the issue URL.
 *
 * @param {string} repo 
 * @param {number} number 
 * @returns 
 */
const getIssueUrl = ( repo, number ) => {
	return `https://github.com/${repos[ repo ] }/${ repo }/issues/${ number }`;
}
