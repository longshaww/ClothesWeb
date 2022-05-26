import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import { useState } from "react";
import axiosMethod from "../../middlewares/axios";

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = await axiosMethod("auth/register", "post", inputs);
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
					/>
				</FormGroup>
				<FormGroup>
					<Label for="dataOfBirth">Date of Birth</Label>
					<Input
						id="dateOfBirth"
						name="dateOfBirth"
						type="text"
						value={inputs.dateOfBirth}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="phoneNumber">Phone</Label>
					<Input
						id="phoneNumber"
						name="phoneNumber"
						type="text"
						value={inputs.phoneNumber}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
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
				</FormGroup>
				<div className="text-center">
					<Button type="submit">Register</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Register;
