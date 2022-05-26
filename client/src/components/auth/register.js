import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
<<<<<<< HEAD

const Register = () => {
	return (
		<Container>
			<Form>
				<FormGroup>
					<Label for="name">Name</Label>
					<Input id="name" name="name" type="text" />
				</FormGroup>
				<FormGroup>
					<Label for="dataOfBirth">First name</Label>
					<Input
						id="dataOfBirth"
						name="dataOfBirth"
						type="text"
=======
import { useState } from "react";

const Register = () => {
	const [inputs, setInputs] = useState({
		name: "",
		dateOfBirth: "",
		phoneNumber: "",
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
	};
	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<FormGroup>
					<Label for="name">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						value={inputs.name}
						onChange={handleChange}
>>>>>>> form register
					/>
				</FormGroup>
				<FormGroup>
					<Label for="dataOfBirth">Date of Birth</Label>
					<Input
						id="dataOfBirth"
						name="dataOfBirth"
						type="text"
<<<<<<< HEAD
=======
						value={inputs.dateOfBirth}
						onChange={handleChange}
>>>>>>> form register
					/>
				</FormGroup>
				<FormGroup>
					<Label for="phoneNumber">Phone</Label>
					<Input
						id="phoneNumber"
						name="phoneNumber"
						type="text"
<<<<<<< HEAD
=======
						value={inputs.phoneNumber}
						onChange={handleChange}
>>>>>>> form register
					/>
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
<<<<<<< HEAD
					<Input id="email" name="email" type="text" />
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input id="password" name="password" type="password" />
=======
					<Input
						id="email"
						name="email"
						value={inputs.email}
						onChange={handleChange}
						type="text"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						value={inputs.password}
						onChange={handleChange}
						type="password"
					/>
>>>>>>> form register
				</FormGroup>
				<div className="text-center">
					<Button type="submit">Register</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Register;
