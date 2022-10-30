import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

function Stats({members}) {

  const getUnemployed = () => members ? members.filter(member => member.employmentStatus === 'Unemployed').length : 0;
  const getTotalRegisteredMembers = () => members ? members.length : 0;
  const getNumSeekingWork = () => members ? members.filter(member => member.isSeekingWork === true).length : 0;

  return (
    <Flex my="5" gap={'3'}>
        <Box rounded="md" boxShadow={'md'} p="3" width={'350px'}> 
            <Stat cursor="pointer" >
                <StatLabel fontWeight={'bold'}>Members</StatLabel>
                <StatNumber>{getTotalRegisteredMembers()}</StatNumber>
                <StatHelpText color={'blackAlpha.600'}>Number of members registered</StatHelpText>
            </Stat>
            </Box>


            <Box rounded="md" boxShadow={'md'} p="3" width={'350px'}> 

            <Stat cursor="pointer">
                <StatLabel fontWeight={'bold'}>Unemployed</StatLabel>
                <StatNumber>{getUnemployed()}</StatNumber>
                <StatHelpText color={'blackAlpha.600'}>Number of members unemployed</StatHelpText>
            </Stat>
            </Box>


            <Box rounded="md" boxShadow={'md'} p="3" width={'350px'}> 
            <Stat cursor="pointer">
                <StatLabel fontWeight={'bold'}>Actively Seeking Work</StatLabel>
                <StatNumber>{getNumSeekingWork()}</StatNumber>
                <StatHelpText color={'blackAlpha.600'}>Currently looking for a job</StatHelpText>
            </Stat>
        </Box>
    </Flex>
  )
}

export default Stats
