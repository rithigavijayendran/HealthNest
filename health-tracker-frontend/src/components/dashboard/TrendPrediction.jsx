// src/components/dashboard/TrendPrediction.jsx

import React, { useEffect, useRef } from "react";
import {
  Box,
  Heading,
  useColorModeValue,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MotionCard = motion(Card);

const TrendPrediction = () => {
  const chartRef = useRef(null);

  // Dynamic import of chartjs-plugin-gradient
  useEffect(() => {
    const loadGradientPlugin = async () => {
      const gradientPlugin = (await import("chartjs-plugin-gradient")).default;
      ChartJS.register(gradientPlugin);
    };
    loadGradientPlugin();
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Consistency Score",
        data: [70, 75, 72, 78, 80, 85, 90],
        fill: true,
        borderColor: "#4299E1",
        tension: 0.4,
        gradient: {
          backgroundColor: {
            axis: "y",
            colors: {
              0: "#90cdf4",
              100: "#2b6cb0",
            },
          },
        },
        pointBackgroundColor: "#2B6CB0",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: useColorModeValue("#1A202C", "#E2E8F0"),
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: useColorModeValue("#2D3748", "#CBD5E0"),
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: useColorModeValue("#2D3748", "#CBD5E0"),
        },
        grid: {
          borderDash: [5, 5],
          color: useColorModeValue("#E2E8F0", "#4A5568"),
        },
      },
    },
  };

  return (
    <MotionCard
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="lg"
      borderRadius="2xl"
      p={4}
      whileHover={{ scale: 1.02 }}
    >
      <CardBody>
        <Heading size="md" mb={4}>
          Weekly Trend Prediction
        </Heading>
        <Box h="300px" w="100%">
          <Line data={data} options={options} ref={chartRef} />
        </Box>
        <Text fontSize="sm" mt={3} color="gray.500">
          Based on your habit logging over the past week.
        </Text>
      </CardBody>
    </MotionCard>
  );
};

export default TrendPrediction;
