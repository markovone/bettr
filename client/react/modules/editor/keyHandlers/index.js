import { handleListTab } from './handleListTab'
import { handleListEnter } from './handleListEnter'
import { handleListBackspace } from './handleListBackspace'


/**
 * Main key handler that delegates to specific handlers
 */
export const handleKeyDown = (editor, event) => {
	if (event.key === 'Tab') {
		if (handleListTab(editor, event)) {
			return
		}
	}

	if (event.key === 'Enter') {
		if (handleListEnter(editor, event)) {
			return
		}
	}

	if (event.key === 'Backspace') {
		if (handleListBackspace(editor, event)) {
			return
		}
	}
}

// Export individual handlers for direct use if needed
export { handleListTab, handleListEnter, handleListBackspace }
