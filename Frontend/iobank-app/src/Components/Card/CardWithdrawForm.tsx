import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Group,
  Title,
  CloseButton,
  Stack,
  Notification,

  NumberInput,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { debitCard, fetchCardStatus, getCard, resetCardStatus } from '../../Slice/CardSlice';
import { showLoader, openLoader, closeLoader } from '../../Slice/PageSlice';
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import type { AppDispatch } from '../../Store/Store';
import Loaders from '../Loaders';

interface CardWithdrawFormProps {
  setShowWithdrawForm: (show: boolean) => void;
}

const CardWithdrawForm: React.FC<CardWithdrawFormProps> = ({ setShowWithdrawForm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(fetchCardStatus);
  const loader = useSelector(showLoader);

  const [amount, setAmount] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === 'SUCCEEDED') {
      dispatch(getCard());

      setTimeout(() => {
        dispatch(closeLoader());
        dispatch(resetCardStatus());
        setSuccess(true);
        setAmount('');
        setShowWithdrawForm(false);
      }, 2000);
    }

    if (status === 'FAILED') {
      setTimeout(() => {
        dispatch(closeLoader());
        dispatch(resetCardStatus());
        setError('Failed to withdraw amount. Please try again.');
      }, 2000);
    }
  }, [status, dispatch, setShowWithdrawForm]);

  const handleWithdraw = () => {
    setError(null);
    setSuccess(false);

    if (!amount || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    dispatch(openLoader());
    dispatch(debitCard({ amount }));
  };

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setShowWithdrawForm(false);
    }
  };

  return (
    <Box
      onClick={onOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        style={{
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 8,
          width: '90vw',
          maxWidth: 400,
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          position: 'relative',
        }}
      >
        {loader && <Loaders />}
        <Group justify="space-between" mb="md">
          <Title order={4}>Withdraw from Card</Title>
          <CloseButton onClick={() => setShowWithdrawForm(false)} />
        </Group>

        {error && (
          <Notification color="red" onClose={() => setError(null)} mb="md" icon={<FaX />}>
            {error}
          </Notification>
        )}
        {success && (
          <Notification color="teal" onClose={() => setSuccess(false)} mb="md" icon={<FaCheck />}>
            Withdrawal successful!
          </Notification>
        )}

        <Stack gap="md">
          <NumberInput
            label="Amount"
            placeholder="Enter amount to withdraw"
            value={amount}
            onChange={(value) => setAmount(typeof value === 'number' ? value : '')}
            min={1}
            required
          />

          <Button fullWidth color="teal.6" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardWithdrawForm;
