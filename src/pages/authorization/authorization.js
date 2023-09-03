import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch, useStore, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { Button, H2, Input } from "../../components";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";
import { ROLE } from "../../constants";

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин")
		.matches(
			/\w+$/,
			"Неверно заполнен логин. Допускаются только буквы и цифры"
		)
		.min(3, "Неверно заполнен логин. Должно быть минимум 3 символа")
		.max(15, "Неверно заполнен логин. Должно быть максимум 15 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^[\w#%]+$/,
			"Неверно заполнен пароль. Допустимые символы: буквы, цифры и символы # и %"
		)
		.min(6, "Неверно заполнен пароль. Должно быть минимум 6 символов")
		.max(30, "Неверно заполнен пароль. Должно быть максимум 30 символов"),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	background-color: #fcadad;
	font-size: 18px;
	margin: 10px 0 0;
	padding: 10px;
	text-align: center;
`;
const AuthorizationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const store = useStore();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;
			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register("login", {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register("password", {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
