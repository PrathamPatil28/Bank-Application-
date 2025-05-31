import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Table,
  Text,
  Badge,
  Group,
  ScrollArea,
  Tooltip,
} from "@mantine/core";
import { fetchTransactionsList, getTransactions } from "../Slice/TransactionSlice";
import SectionContainer from "./Section/SectionContainer";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { useEffect } from "react";
import type { AppDispatch } from "../Store/Store";
import { FaInfoCircle } from "react-icons/fa";

const Transaction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactionsList = useSelector(fetchTransactionsList);

  useEffect(() => {
    dispatch(getTransactions(0)); // Load page 0 initially
  }, [dispatch]);

  const getTypeIcon = (type: string) =>
    type === "CREDIT" ? (
      <GoArrowDownRight size={16} color="#2f9e44" />
    ) : (
      <GoArrowUpRight size={16} color="#d6336c" />
    );

  const getStatusBadge = (status: string) => {
    const map = {
      COMPLETED: "green",
      PENDING: "yellow",
      FAILED: "red",
    } as Record<string, string>;

    return (
      <Badge variant="light" color={map[status.toUpperCase()] || "gray"} size="sm">
        {status}
      </Badge>
    );
  };

  // Center style for all table cells
  const centeredStyle = { textAlign: "center" as const };

  return (
    <SectionContainer extraStyle="overflow-x-auto">
      <Card shadow="xs" radius="md" withBorder p="md">
        <Text size="lg" fw={600} mb="md" ta="center" color="gray.7">
          Recent Transactions
        </Text>

        <ScrollArea offsetScrollbars>
          <Table verticalSpacing="xs" highlightOnHover striped>
            <thead>
              <tr>
                <th style={centeredStyle}>Date</th>
                <th style={centeredStyle}>Description</th>
                <th style={centeredStyle}>Amount</th>
                <th style={centeredStyle}>Type</th>
                <th style={centeredStyle}>Status</th>
                <th style={centeredStyle}>Info</th>
              </tr>
            </thead>
            <tbody>
              {transactionsList.length > 0 ? (
                transactionsList.map((tx: any) => (
                  <tr key={tx.id}>
                    <td style={centeredStyle}>{tx.createdAt?.substring(0, 10)}</td>
                    <td style={centeredStyle}>
                      <Text size="sm" fw={500}>
                        {tx.description || "—"}
                      </Text>
                    </td>
                    <td style={centeredStyle}>
                      <Text
                        size="sm"
                        c={tx.type === "CREDIT" ? "green.7" : "red.7"}
                        fw={600}
                      >
                        $ {tx.amount}
                      </Text>
                    </td>
                    <td style={centeredStyle}>
                      <Group gap={6} justify="center">
                        {getTypeIcon(tx.type)}
                        <Text size="xs" tt="capitalize">{tx.type}</Text>
                      </Group>
                    </td>
                    <td style={centeredStyle}>{getStatusBadge(tx.status)}</td>
                    <td style={centeredStyle}>
                      <Tooltip label="View details" withArrow>
                        <FaInfoCircle size={18} color="#228be6" style={{ cursor: "pointer" }} />
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={centeredStyle}>
                    <Text ta="center" c="dimmed">
                      No transactions to show
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Card>
    </SectionContainer>
  );
};

export default Transaction;
