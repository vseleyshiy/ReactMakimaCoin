import toast, { ToastPosition } from 'react-hot-toast'

interface Props {
	text: string
	duration?: number
	position?: ToastPosition
}

export function ToastError(props: Props) {
	const { text, duration, position } = props

	toast(text, {
		duration: duration ? duration : 5000,
		position: position ? position : 'bottom-center',
		icon: '❗',
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff',
		},
	})
}
