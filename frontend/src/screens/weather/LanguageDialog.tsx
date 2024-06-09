import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
} from '@mui/material'
import React, { useState } from 'react'
import { Languages } from '../../utils/Languages'

interface LanguageDialogProps {
	open: boolean
	onClose: (selectedLanguage: string) => void // Обновлено
}

const LanguageDialog: React.FC<LanguageDialogProps> = ({ open, onClose }) => {
	const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

	const handleClose = () => {
		onClose(selectedLanguage)
	}

	const handleLanguageToggle = (language: string) => {
		setSelectedLanguage(language)
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Language Selection</DialogTitle>
			<DialogContent>
				{Object.entries(Languages.supportedLanguages).map(([code, name]) => (
					<FormControlLabel
						key={code}
						control={
							<Checkbox
								checked={selectedLanguage === code} // Отмечен только если язык совпадает с выбранным
								onChange={() => handleLanguageToggle(code)}
							/>
						}
						label={name}
					/>
				))}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClose} variant='contained' color='primary'>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default LanguageDialog
