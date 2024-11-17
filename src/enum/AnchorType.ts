export enum AnchorType {
    Href = 'href', // Vanilla JS+HTML anchor
    RouterLink = 'router-link', // For vue-router integration
    RouterLinkBack = 'router-link-back', // For vue-router back navigation
    Mail = 'mail', // Triggers OS mail integration
    Tel = 'tel', // Triggers OS phone integration
    Tab = 'tab', // New tab, similar to target="_blank"
    Download = 'download', // Download link
    Action = 'action', // Performs an action, without route changes

    //@todo: future legacy support remove
    Legacy = '', // Backwards compatibility with v1.0-v1.1
}