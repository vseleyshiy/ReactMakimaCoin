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
import { IInfo } from '../types'

export function Auth() {
	const { register, handleSubmit, formState, reset } = useForm<IAuth>({
		mode: 'onChange',
	})

	const inputs: IInfo[] = [
		{
			id: 'email',
			placeholder: 'Введите ваш email',
			registerType: 'email',
			registerRequired: 'Это поле обязательно для заполнения!',
			error: formState.errors.email?.message,
		},
		{
			id: 'password',
			placeholder: 'Введите ваш пароль',
			registerType: 'password',
			registerRequired: 'Это поле обязательно для заполнения!',
			error: formState.errors.password?.message,
			isPassword: true,
		},
	]

	const navigate = useNavigate()

	const { data, mutate, isSuccess } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuth) => authService.login(data),
	})

	useEffect(() => {
		if (data?.data.status == 'success') {
			console.log(data?.data.data)
			const user_data = data.data.data

			sessionStorage.setItem('id', `${user_data.id}`)
			sessionStorage.setItem('username', user_data.username)
			sessionStorage.setItem('balance', `${user_data.balance}`)
			sessionStorage.setItem('roleLvl', `${user_data.role_lvl}`)
			sessionStorage.setItem('maxEnergyLvl', `${user_data.max_energy_lvl}`)
			sessionStorage.setItem('multitapLvl', `${user_data.multitap_lvl}`)
			sessionStorage.setItem('hourProfit', `${user_data.hour_profit}`)
			sessionStorage.setItem('cards', `${user_data.cards}`)
			sessionStorage.setItem('tasks', `${user_data.tasks}`)

			toast.success('Авторизация прошла успешно!')
			reset()
			navigate(RMC_PAGES.HOME)
		}
	}, [isSuccess])

	const onSubmit: SubmitHandler<IAuth> = data => {
		mutate(data)
	}

	return (
		<>
			<div className={styles.form__wrap}>
				<h1 className={styles.title}>Авторизация</h1>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.form__main}>
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
					<button className={styles.form__button}>Войти</button>
				</form>
				<div className={styles.link}>
					Ещё не зарегестрированы?
					<Link
						to={RMC_PAGES.REG}
						style={{
							color: 'rgb(111, 111, 151)',
						}}
					>
						Регистрация
					</Link>
				</div>
			</div>
		</>
	)
}
