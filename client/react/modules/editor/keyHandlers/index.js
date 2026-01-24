import { handleListBackspace } from './handleListBackspace'
import { handleListTab } from './handleListTab'
import { handleListEnter } from './handleListEnter'


/**
 * Main key handler that delegates to specific handlers
 */
export const handleKeyDown = (editor, event) => {
	if (event.key === 'Backspace') {
		if (handleListBackspace(editor, event)) {
			return
		}
	}

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
}

// Export individual handlers for direct use if needed
export { handleListBackspace, handleListTab, handleListEnter }
