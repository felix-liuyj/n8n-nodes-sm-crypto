import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { sm2 } from 'sm-crypto';

export class Sm2Crypto implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SM2 Crypto',
		name: 'sm2Crypto',
		group: ['transform'],
		version: 1,
		description: 'Encrypt or decrypt strings using the SM2 algorithm',
		defaults: {
			name: 'SM2 Crypto',
		},
		icon: 'file:./sm2.logo.svg',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{ name: 'Encrypt', value: 'encrypt' },
					{ name: 'Decrypt', value: 'decrypt' },
				],
				default: 'encrypt',
				noDataExpression: true,
			},
			{
				displayName: 'Token (Key)',
				name: 'token',
				type: 'string',
				default: '',
				required: true,
				typeOptions: {
					password: true,
				},
				description: 'Public key for encryption, or private key for decryption',
			},
			{
				displayName: 'Input Field Name',
				name: 'inputField',
				type: 'string',
				default: 'data',
				description: 'Name of the field to encrypt or decrypt',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as 'encrypt' | 'decrypt';
			const token = this.getNodeParameter('token', i) as string;
			const inputField = this.getNodeParameter('inputField', i) as string;
			const value = items[i].json[inputField];

			let result;
			try {
				if (operation === 'encrypt') {
					const plaintext = typeof value === 'string' ? value : JSON.stringify(value);
					const cipher = sm2.doEncrypt(plaintext, token, 1);
					result = { ciphertext: '04' + cipher };
				} else {
					let cipher = typeof value === 'string' ? value : String(value);
					if (cipher.startsWith('04')) cipher = cipher.slice(2);

					let decrypted = sm2.doDecrypt(cipher, token, 1);

					// 判断是否为 JSON 字符串
					try {
						result = JSON.parse(decrypted); // 返回整个对象
					} catch {
						result = { plaintext: decrypted }; // 返回原始字符串
					}
				}
			} catch (error) {
				result = { error: (error as Error).message };
			}

			returnData.push({
				json: {
					...items[i].json,
					...result,
				},
			});
		}

		return [returnData];
	}
}
