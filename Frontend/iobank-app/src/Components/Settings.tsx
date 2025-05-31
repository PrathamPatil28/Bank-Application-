import { Switch, TextInput, Select, Button, Divider, Title, Group, Paper } from '@mantine/core';
import { CiLock } from "react-icons/ci";
import SectionContainer from './Section/SectionContainer';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Settings = () => {
  return (
    <SectionContainer>
      <Title order={2} className="mb-6 text-center text-blue-600 font-bold">
        IO Bank - Settings
      </Title>

      {/* Profile Settings */}
      <Paper shadow="md" radius="lg" p="lg" className="mb-6">
        <Group align="center" className="mb-4">
          <FaUserCircle size={28} className="text-blue-600" />
          <Title order={4}>Profile Settings</Title>
        </Group>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Full Name" placeholder="John Doe" />
          <TextInput label="Email" placeholder="john@example.com" />
          <TextInput label="Phone Number" placeholder="+91 98765 43210" />
          <Select
            label="Language"
            placeholder="Select"
            data={['English', 'Hindi', 'Marathi']}
          />
        </div>

        <Button variant="filled" color="blue" className="mt-6">
          Save Profile
        </Button>
      </Paper>

      <Divider my="md" />

      {/* Security Settings */}
      <Paper shadow="md" radius="lg" p="lg" className="mb-6">
        <Group align="center" className="mb-4">
          <CiLock size={28} className="text-red-500" />
          <Title order={4}>Security</Title>
        </Group>

        <div className="space-y-4">
          <TextInput type="password" label="Current Password" />
          <TextInput type="password" label="New Password" />
          <TextInput type="password" label="Confirm New Password" />

          <Button variant="filled" color="red">
            Change Password
          </Button>
        </div>
      </Paper>

      <Divider my="md" />

      {/* Notification Settings */}
      <Paper shadow="md" radius="lg" p="lg">
        <Group align="center" className="mb-4">
          <FaBell size={28} className="text-yellow-500" />
          <Title order={4}>Notifications</Title>
        </Group>

        <div className="space-y-4">
          <Switch label="Email Notifications" defaultChecked />
          <Switch label="SMS Alerts" />
          <Switch label="Push Notifications" defaultChecked />
        </div>

        <Button variant="light" color="yellow" className="mt-6">
          Update Preferences
        </Button>
      </Paper>
    </SectionContainer>
  );
};

export default Settings;
