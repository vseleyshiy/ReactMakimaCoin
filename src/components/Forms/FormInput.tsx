import { CircleHelp, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { ToastError } from '../../utils/ToastError'
import styles from './Forms.module.css'
import { IInfo } from './types'

interface Props {
	info: IInfo
	register: UseFormRegister<any>
	registerType: string
}

export function FormInput(props: Props) {
	const { register, info, registerType } = props

	const [passInfo, setPassInfo] = useState({
		password: '',
		showPassword: false,
	})

	const handleClickShowPassword = () => {
		setPassInfo({
			...passInfo,
			showPassword: !passInfo.showPassword,
		})
	}

	return (
		<>
			<span className={styles.error}>{info.error && info.error}</span>
			<div className={styles.form__rowInfo}>
				<label htmlFor={info.id} className={styles.form__rowTitle}>
					{registerType.charAt(0).toUpperCase() + registerType.slice(1)}
				</label>
				{info.isPassword && (
					<CircleHelp
						className={styles.form__help}
						onClick={() => {
							ToastError({
								text: 'Пароль должен быть написан латинскими буквами, содержать минимум 8 символов, 1 число, 1 спецсимвол, 1 латинскую бувку в верхнем и нижнем регистре.',
							})
						}}
					/>
				)}
			</div>
			<div className={styles.form__inputWrap}>
				<input
					id={info.id}
					className={styles.form__input}
					type={
						info.isPassword
							? passInfo.showPassword
								? 'text'
								: 'password'
							: 'email'
					}
					placeholder={info.placeholder}
					{...(info.isPassword
						? {
								...register(registerType, {
									required: info.registerRequired,
									pattern: {
										value:
											/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
										message: 'Невалидный пароль!',
									},
								}),
						  }
						: {
								...register(registerType, {
									required: info.registerRequired,
								}),
						  })}
				/>
				{info.isPassword && passInfo?.showPassword && (
					<Eye
						className={styles.form__inputButton}
						onClick={() => {
							handleClickShowPassword()
						}}
					/>
				)}
				{info.isPassword && !passInfo.showPassword && (
					<EyeOff
						className={styles.form__inputButton}
						onClick={() => {
							handleClickShowPassword()
						}}
					/>
				)}
			</div>
		</>
	)
}
