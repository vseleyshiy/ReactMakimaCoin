import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { RMC_PAGES } from '../../../config/pages-url.config'
import { authService } from '../../../services/auth.service'
import { IAuth } from '../../../types/auth.types'
import { FormInput } from '../FormInput'
import styles from '../Forms.module.css'
import { IInfo, IReg } from '../types'

export function Reg() {
	const { register, handleSubmit, formState, reset, watch } = useForm<IReg>({
		mode: 'onChange',
	})

	const watchPass1 = watch('password1')
	const watchPass2 = watch('password2')

	const inputs: IInfo[] = [
		{
			id: 'email',
			placeholder: 'Введите ваш email',
			registerType: 'email',
			registerRequired: 'Это поле обязательно для заполнения!',
			error: formState.errors.email?.message,
		},
		{
			id: 'password1',
			placeholder: 'Введите ваш пароль',
			registerType: 'password1',
			registerRequired: 'Это поле обязательно для заполнения!',
			error: formState.errors.password1?.message,
			isPassword: true,
		},
		{
			id: 'password2',
			placeholder: 'Повторите пароль',
			registerType: 'password2',
			registerRequired: 'Это поле обязательно для заполнения!',
			error: formState.errors.password2?.message,
			isPassword: true,
		},
	]

	const navigate = useNavigate()

	const { data, mutate, isSuccess } = useMutation({
		mutationKey: ['reg'],
		mutationFn: (data: IAuth) => authService.reg(data),
	})

	const onSubmit: SubmitHandler<IReg> = data => {
		const email = data.email
		const password = data.password1

		const user_data = {
			email,
			password,
		}

		if (watchPass1 === watchPass2) {
			mutate(user_data)
		} else {
			toast.error('Пароли не совпадают!')
		}
	}

	useEffect(() => {
		if (
			data?.data.status == 'error' &&
			data.data.message == 'User already exists'
		) {
			toast.error('Пользователь с таким никнеймом уже занят!')
		} else if (data?.data.status == 'success') {
			toast.success('Регистрация прошла успешно!')
			reset()
			navigate(RMC_PAGES.AUTH)
		}
	}, [isSuccess])

	// чёто я нихуя не понимаю, но нужно привести рег в нормальному состоянию, вынося всю логику отдельно

	return (
		<>
			<div className={styles.form__wrap}>
				<h1 className={styles.title}>Регистрация</h1>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.form__main}>
						<div className={styles.form__row}>
							{inputs.map(item => (
								<div key={item.id} className={styles.form__row}>
									<FormInput
										registerType={item.registerType}
										info={item}
										register={register}
									/>
								</div>
							))}
						</div>
					</div>
					<button className={styles.form__button}>Зарегистрироваться</button>
				</form>
				<span className={styles.link}>
					Уже зарегестрированы?
					<Link
						to={RMC_PAGES.AUTH}
						style={{
							color: 'rgb(111, 111, 151)',
						}}
					>
						Авторизация
					</Link>
				</span>
			</div>
		</>
	)
}
