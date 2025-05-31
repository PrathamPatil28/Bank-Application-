import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Title, Group, Text, Paper,  Badge, Button, Stack, SimpleGrid, Skeleton } from "@mantine/core";
import { fetchAccount, getAccount } from "../Slice/AccountSlice";
import SectionContainer from "./Section/SectionContainer";
import Payments from "./Payments/Payments";
import type { AppDispatch } from "../Store/Store";
import { useNavigate } from "react-router-dom";

type Account = {
  id: string;
  flag: string;
  label: string;
  symbol: string;
  balance: number;
  code: string;
};

const currencyToCountryMap: { [key: string]: string } = {
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  NGN: "ng",
  INR: "in",
};

const Home = () => {
  const accountList = useSelector(fetchAccount) || [];
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  const AccountItem = ({ acc }: { acc: Account }) => {
    const countryCode = currencyToCountryMap[acc.code] || "un";

  const navigateCurrency  =  (code:any)=>{
       navigate(`/dashboard/accounts?currency=${code}`)
  }  

    return (
      <Paper
        shadow="sm"
        radius="md"
        withBorder
        className="bg-gray-50 p-4 transition duration-300 hover:shadow-md hover:border-blue-400 hover:translate-x-1"
      >
        <Stack gap="xs" onClick={() => navigateCurrency(acc.code)}>
          <img
            src={`https://flagcdn.com/80x60/${countryCode}.png`}
            srcSet={`
              https://flagcdn.com/160x120/${countryCode}.png 2x,
              https://flagcdn.com/240x180/${countryCode}.png 3x
            `}
            width="100"
            height="60"
            alt={`${acc.label} Flag`}
          />
          <Text size="sm" fw={500}>{acc.label}</Text>
          <Group justify="space-between">
            <Text size="sm">{acc.symbol} {acc.balance.toFixed(2)}</Text>
            <Badge color="blue" variant="light">{acc.code}</Badge>
          </Group>
        </Stack>
      </Paper>
    );
  };

  const totalBalance = accountList.reduce((acc: number, item: Account) => acc + item.balance, 0);

  return (
    <>
      {/* Greeting & Overview */}
      <SectionContainer extraStyle="pb-6">
        <Group justify="space-between" mb="md">
          <div>
            <Title order={3}>Welcome Back 👋</Title>
            <Text size="sm" c="dimmed">Here's a snapshot of your banking activity</Text>
          </div>
          <Button variant="outline" radius="md" color="blue">Currency Converter</Button>
        </Group>

        {/* Account Summary */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="lg">
          <Paper p="md" radius="md" withBorder>
            <Text size="sm" c="dimmed">Total Accounts</Text>
            <Text fw={700} size="lg">{accountList.length}</Text>
          </Paper>
          <Paper p="md" radius="md" withBorder>
            <Text size="sm" c="dimmed">Total Balance</Text>
            <Text fw={700} size="lg">₹ {totalBalance.toFixed(2)}</Text>
          </Paper>
          <Paper p="md" radius="md" withBorder>
            <Text size="sm" c="dimmed">Active Currencies</Text>
            <Text fw={700} size="lg">{[...new Set(accountList.map((acc: Account) => acc.code))].length}</Text>
          </Paper>
        </SimpleGrid>
      </SectionContainer>

      {/* Account Cards */}
      <SectionContainer extraStyle="pb-8">
        <Text fw={600} mb="sm" size="lg" c="gray.7">Accounts & Balances</Text>
        <SimpleGrid className="!cursor-pointer" cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {accountList.length === 0 ? (
            <>
              <Skeleton height={120} />
              <Skeleton height={120} />
              <Skeleton height={120} />
            </>
          ) : (
            accountList.map((acc: Account) => (
              <AccountItem acc={acc} key={acc.id} />
            ))
          )}
        </SimpleGrid>
      </SectionContainer>

      {/* Recent Transactions Preview */}
      <SectionContainer extraStyle="pb-10">
        <Group justify="space-between" mb="sm">
          <Text fw={600} size="lg">Recent Transactions</Text>
          <Button variant="subtle" size="xs">View All</Button>
        </Group>
        <Stack gap="sm">
          <Paper p="sm" radius="md" withBorder>
            <Group justify="space-between">
              <Text>Electricity Bill - ₹1,200</Text>
              <Text size="xs" c="dimmed">25 May 2025</Text>
            </Group>
          </Paper>
          <Paper p="sm" radius="md" withBorder>
            <Group justify="space-between">
              <Text>Card Payment - ₹850</Text>
              <Text size="xs" c="dimmed">24 May 2025</Text>
            </Group>
          </Paper>
          <Paper p="sm" radius="md" withBorder>
            <Group justify="space-between">
              <Text>Invoice Settlement - ₹1,950</Text>
              <Text size="xs" c="dimmed">23 May 2025</Text>
            </Group>
          </Paper>
        </Stack>
      </SectionContainer>

      {/* Payment Options */}
      <Payments />
    </>
  );
};

export default Home;
