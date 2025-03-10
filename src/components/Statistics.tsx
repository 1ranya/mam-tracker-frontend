import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { getTracking } from '../api/TrackingApi';
import { StatisticEntry, Stats, TrackingEntry } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatisticsContainer = styled.div`
  padding: 20px;
`;

const StatisticsTitle = styled.h2`
  margin-bottom: 10px;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ChartWrapper = styled.div`
  width: 400px;
  height: 400px;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  margin: 0 5px;
  padding: 10px;
  background-color: #f2d7d9;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e1c4c6;
  }
`;

interface Props {
  recapEntries: TrackingEntry[];
};

const Statistics: React.FC<Props> = ({ recapEntries }) => {
  const [trackingData, setTrackingData] = useState<TrackingEntry[]>([]);
  const [filteredData, setFilteredData] = useState<TrackingEntry[]>([]);
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'month' | 'twoMonths' | 'exactDate'>('today');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Pour la date exacte

  useEffect(() => {
        setTrackingData(recapEntries);
        const today = new Date();
        const todayData = recapEntries.filter((entry:any) => {
          const entryDate = new Date(entry.timestamp);
          return (
            entryDate.getFullYear() === today.getFullYear() &&
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getDate() === today.getDate()
          );
        });
        setFilteredData(todayData);
      }
  , [recapEntries]);

  // Fonction pour filtrer les données en fonction de la période
  useEffect(() => {
    setTrackingData(recapEntries);
  },[recapEntries]);

  const filterData = useCallback((period: 'today' | 'week' | 'month' | 'twoMonths' | 'exactDate', data?: StatisticEntry[]) => {
    const today = new Date();

    const filteredData =
      period === 'today'
        ? trackingData.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            return (
              entryDate.getFullYear() === today.getFullYear() &&
              entryDate.getMonth() === today.getMonth() &&
              entryDate.getDate() === today.getDate()
            );
          })
        : period === 'week'
        ? trackingData.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            const oneWeekAgo = new Date(today);
            oneWeekAgo.setDate(today.getDate() - 7);
            return entryDate >= oneWeekAgo && entryDate <= today;
          })
        : period === 'month'
        ? trackingData.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            return (
              entryDate.getFullYear() === today.getFullYear() &&
              entryDate.getMonth() === today.getMonth()
            );
          })
        : period === 'twoMonths'
        ? trackingData.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            const twoMonthsAgo = new Date(today);
            twoMonthsAgo.setMonth(today.getMonth() - 2);
            return entryDate >= twoMonthsAgo && entryDate <= today;
          })
        : period === 'exactDate' && selectedDate
        ? trackingData.filter((entry) => {
            const entryDate = new Date(entry.timestamp);
            return (
              entryDate.getFullYear() === selectedDate.getFullYear() &&
              entryDate.getMonth() === selectedDate.getMonth() &&
              entryDate.getDate() === selectedDate.getDate()
            );
          })
        : trackingData;

    setFilteredData(filteredData || []);
  }, [trackingData, selectedDate]);

  const calculateTotals = (data: StatisticEntry[]): Stats => {
    const totalBottles = data.reduce((sum, entry) => sum + (entry.bottles || 0), 0);
    const totalDiapers = data.reduce((sum, entry) => sum + (entry.diapers || 0), 0);
    const totalBreastPumping = data.reduce((sum, entry) => sum + (entry.breastPumping || 0), 0);

    return {
      totalBottles,
      totalDiapers,
      totalBreastPumping,
    };
  };

  const handleFilterChange = (period: 'today' | 'week' | 'month' | 'twoMonths' | 'exactDate') => {
    setFilterPeriod(period);
    filterData(period);
  };

  const barChartData = {
    labels: ['Bottles', 'Diapers', 'Breast Pumping'],
    datasets: [
      {
        label: filterPeriod.toUpperCase(),
        data: [
          calculateTotals(filteredData).totalBottles,
          calculateTotals(filteredData).totalDiapers,
          calculateTotals(filteredData).totalBreastPumping,
        ],
        backgroundColor: [
          'rgba(75,192,192,0.2)',
          'rgba(54,162,235,0.2)',
          'rgba(153,102,255,0.2)',
        ],
        borderColor: [
          'rgba(75,192,192,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Bottles', 'Diapers', 'Breast Pumping'],
    datasets: [
      {
        label: filterPeriod.toUpperCase(),
        data: [
          calculateTotals(filteredData).totalBottles,
          calculateTotals(filteredData).totalDiapers,
          calculateTotals(filteredData).totalBreastPumping,
        ],
        backgroundColor: [
          'rgba(255,99,132,0.2)',
          'rgba(255,206,86,0.2)',
          'rgba(75,192,192,0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(255,206,86,1)',
          'rgba(75,192,192,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Statistics',
      },
    },
  };

  return (
    <StatisticsContainer>
      <StatisticsTitle>Statistics</StatisticsTitle>
      <FilterContainer>
        <FilterButton onClick={() => handleFilterChange('today')}>Today</FilterButton>
        <FilterButton onClick={() => handleFilterChange('week')}>This Week</FilterButton>
        <FilterButton onClick={() => handleFilterChange('month')}>This Month</FilterButton>
        <FilterButton onClick={() => handleFilterChange('twoMonths')}>Last Two Months</FilterButton>
        <FilterButton onClick={() => handleFilterChange('exactDate')}>Exact Date</FilterButton>
        {filterPeriod === "exactDate" && (
          <input type="date" onChange={(e) => {
            const dateValue = e.target.value;
            setSelectedDate(dateValue ? new Date(dateValue) : null);
          }} />
        )}
      </FilterContainer>
      {/* Graphiques */}
      <ChartContainer>
        <ChartWrapper><Bar options={barChartOptions} data={barChartData} /></ChartWrapper>
        <ChartWrapper><Pie data={pieChartData} /></ChartWrapper>
      </ChartContainer>
    </StatisticsContainer>
  );
};

export default Statistics;
