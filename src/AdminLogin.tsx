import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { login } from 'requests';

interface User {
  user?: string;
  password?: string;
  isAdmin?: boolean;
}
interface Props {
  isAdmin: boolean;
  setIsAdmin: Function;
  //   user: User;
  //   setUser: Function;
}
////// runs the admin login form//////
const AdminLogin: React.FC<Props> = ({
  isAdmin,
  setIsAdmin,
  //   user,
  //   setUser,
}) => {
  const [loginPassword, setLoginPassword] = useState('');

  const form = useForm({
    initialValues: {
      password: loginPassword,
    },
  });

  return (
    <div>
      <p>Enter Admin Password</p>
      <Box>
        <form
          onSubmit={(event) => {
            console.log('submit');
            event.preventDefault();
            const password = form.values.password;
            console.log({ password });
            login(password, setIsAdmin);
          }}
        >
          <TextInput
            withAsterisk
            label="Password"
            placeholder="Enter Admin Password"
            {...form.getInputProps('password')}
          ></TextInput>
          <Button type="submit">Submit</Button>
        </form>
      </Box>

      {/* {errorMessage && <p>{errorMessage}</p>} */}
    </div>
  );
};

export { AdminLogin };
