import {
  Button,
  Menu,

  Paper,

} from "@mantine/core";
import { FaExchangeAlt, FaMoneyBillWave, FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import DepositForm from "./DepositForm";

function ActionButtons({
  setShowDepositForm,
  setToOther,
  setShowWithdrawForm,
  navigatePage,
  showDepositForm,
  toOther
}: {
  setShowDepositForm: (show: boolean) => void;
  setToOther: (toOther: boolean) => void;
  setShowWithdrawForm: (show: boolean) => void;
  navigatePage: (path: string) => void;
  showDepositForm: boolean;
  toOther: boolean;
}) {
  return (
    <Paper
      withBorder
      radius="xl"
      p="md"
      shadow="md"
      className="!flex flex-wrap justify-center sm:justify-start !gap-4 mt-6"
    >
      {/* Deposit Options using Mantine Menu */}
      <Menu  shadow="md" width={200} position="bottom-start"  withArrow>
        <Menu.Target>
          <Button
            leftSection={<MdOutlineAccountBalanceWallet size={18} />}
            rightSection={<FiChevronDown size={16} />}
            variant="filled"
            color="cyan"
            radius="xl"
          >
            Deposit Options
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<FaMoneyBillWave size={14} />}
            onClick={() => {
              setToOther(false);
              setShowDepositForm(true);
            }}
          >
            Deposit to Self
          </Menu.Item>
          <Menu.Item
            leftSection={<FaMoneyCheckAlt size={14} />}
            onClick={() => {
              setToOther(true);
              setShowDepositForm(true);
            }}
          >
            Deposit to Other
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {/* Withdraw Button */}
      <Button
        variant="filled"
        color="red"
        radius="xl"
        onClick={() => setShowWithdrawForm(true)}
      >
        Withdraw
      </Button>

      {/* Convert Button */}
      <Button
        variant="light"
        radius="xl"
        color="gray"
        leftSection={<FaExchangeAlt size={16} />}
        onClick={() => navigatePage("/dashboard/convert")}
      >
        Convert
      </Button>

      {/* Deposit Form Modal */}
      {showDepositForm && (
        <DepositForm setShowDepositForm={setShowDepositForm} toOther={toOther} />
      )}
    </Paper>
  );
}

export default ActionButtons;
