import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";

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
					/>
				</FormGroup>
				<FormGroup>
					<Label for="dataOfBirth">Date of Birth</Label>
					<Input
						id="dataOfBirth"
						name="dataOfBirth"
						type="text"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="phoneNumber">Phone</Label>
					<Input
						id="phoneNumber"
						name="phoneNumber"
						type="text"
					/>
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="text" />
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input id="password" name="password" type="password" />
				</FormGroup>
				<div className="text-center">
					<Button type="submit">Register</Button>
				</div>
			</Form>
		</Container>
	);
};

export default Register;
