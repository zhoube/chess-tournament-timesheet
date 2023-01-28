import { STATUS } from "../constants";
import { Player } from "./types";

const players: Player[] = 
	[
		{
			id: 1,
			name: 'Tin Jingyao',
			status: STATUS.IN,
			exits: 0,
		},
		{
			id: 2,
			name: 'Goh, Wei Ming Kevin',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 3,
			name: 'Siddharth, Jagadeesh',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 4,
			name: 'Susilodinata, Andrean',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 5,
			name: 'Wong, Zhenyong Jayden',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 6,
			name: 'Gong, Qianyun',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 7,
			name: 'Paciencia, Enrique',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 8,
			name: 'Wong, Meng Kong',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 9,
			name: 'Chow, Mon Ben',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 10,
			name: 'Liu, Hongtao',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 11,
			name: 'Ong, Yi Herng Joel',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 12,
			name: 'Ng, Sheng Feng',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 13,
			name: 'Ho, Xinglun Royce',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 14,
			name: 'Tan, Zhong Kai',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 15,
			name: 'Saravanan, Durga',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 16,
			name: 'Teo, Hong Ming',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 17,
			name: 'Fang, Kun',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 18,
			name: 'Kapoor, Satvik',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 19,
			name: 'Cai, Mingzhe',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 20,
			name: 'Cheong, Sue Lyn',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 21,
			name: 'Lee, Jing Xi Jonathan',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 22,
			name: 'Gao, Zhenxi Jerry',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 23,
			name: 'Rice, Lauren',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 24,
			name: 'Lakshminarasimhan, Rahul',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 25,
			name: 'Siddharth, Sai',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 26,
			name: 'Burman, Ray Pritish',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 27,
			name: 'Sanjay, Vasu',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 28,
			name: 'Wong, Shyun Fwu Aldrin',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 29,
			name: 'Yu, Bei Hao',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 30,
			name: 'Ng, Say Liang',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 31,
			name: 'Sreekarthika, Velmurugan',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 32,
			name: 'Rice, Leah',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 33,
			name: 'Pang, Kay Yan Eden',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 34,
			name: 'Vijay, Rege',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 35,
			name: 'Ashwath, Kaushik',
			status: STATUS.IN,
			exits: 0
		},
		{
			id: 36,
			name: 'Nainika, Gupta',
			status: STATUS.IN,
			exits: 0
		},
	];

export const sortedPlayers = players.sort((player1, player2) => {
	if (player1.name > player2.name) {
		return 1;
	}
	return -1;
})