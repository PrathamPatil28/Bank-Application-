import { useEffect } from "react";
import {
  Card,
  Title,
  Text,
  Group,
  Loader,
  Avatar,
  Divider,
  Stack,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUserProfile, fetchUserStatus } from "../Slice/UserSlice";
import type { AppDispatch } from "../Store/Store";
import SectionContainer from "./Section/SectionContainer";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(fetchUser);
  const status = useSelector(fetchUserStatus);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (status === "LOADING") {
    return (
      <SectionContainer>
        <Loader color="blue" size="lg" />
      </SectionContainer>
    );
  }

  if (!user?.username) {
    return (
      <SectionContainer>
        <Text color="red" size="lg" ta="center">
          User not found or unauthorized.
        </Text>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <Card shadow="md" radius="lg" p="xl" withBorder>
        <Group gap="center" mb="lg">
          <Avatar size={100} radius="xl" src={user.avatar || undefined}>
            {user.firstName?.charAt(0)}
          </Avatar>
        </Group>

        <Stack gap="xs" align="center">
          <Title order={3}>
            Welcome, {user.firstName} {user.lastName}
          </Title>
          <Text size="sm" color="dimmed">
            @{user.username} | #{user.tag}
          </Text>
        </Stack>

        <Divider my="md" />

        <Stack gap="xs">
          <Text>
            <strong>Gender:</strong> {user.gender}
          </Text>
          <Text>
            <strong>Phone:</strong> {user.tel}
          </Text>
          <Text>
            <strong>Date of Birth:</strong> {user.dob}
          </Text>
        </Stack>
      </Card>
    </SectionContainer>
  );
};

export default Profile;
