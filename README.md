# n8n-nodes-sm-crypto

这是一个 n8n 社区节点，让您可以在 n8n 工作流中使用 SM2 密码学操作。

SM2 是基于椭圆曲线的公钥密码算法，是中国国家密码标准（GM/T 0003-2012）的一部分。该节点使用 SM2 算法提供安全的加密和解密功能。

[n8n](https://n8n.io/) 是一个[公平代码许可](https://docs.n8n.io/reference/license/)的工作流自动化平台。

[安装](#安装)  
[操作](#操作)  
[兼容性](#兼容性)  
[使用方法](#使用方法)  
[资源](#资源)  

## 安装

请按照 n8n 社区节点文档中的[安装指南](https://docs.n8n.io/integrations/community-nodes/installation/)进行操作。

安装软件包：
```bash
npm install n8n-nodes-sm-crypto
```

## 操作

该节点支持以下操作：

- **加密**：使用 SM2 公钥加密明文数据
- **解密**：使用 SM2 私钥解密密文

## 兼容性

- 最低 n8n 版本：1.0.0
- Node.js 版本：>=20.15
- 已测试的 n8n 版本：1.x

## 使用方法

### 基本设置

1. 将 SM2 加密节点添加到您的工作流中
2. 选择操作（加密或解密）
3. 提供适当的密钥：
   - 对于**加密**：使用 SM2 公钥
   - 对于**解密**：使用 SM2 私钥
4. 指定包含要处理数据的输入字段名称

### 输入配置

- **操作**：选择"加密"或"解密"
- **令牌（密钥）**：
  - 用于加密：SM2 公钥（十六进制格式）
  - 用于解密：SM2 私钥（十六进制格式）
- **输入字段名称**：输入数据中包含要加密/解密文本的字段名称（默认："data"）

### 输出

该节点将结果添加到您的数据中：
- **加密**：添加包含加密数据的 `ciphertext` 字段（以 '04' 为前缀）
- **解密**：添加包含解密数据的 `plaintext` 字段
- **错误**：如果发生错误，将添加包含错误消息的 `error` 字段

### 使用示例

**加密示例：**
```json
输入：{ "data": "Hello, World!" }
输出：{ "data": "Hello, World!", "ciphertext": "04..." }
```

**解密示例：**
```json
输入：{ "data": "04..." }
输出：{ "data": "04...", "plaintext": "Hello, World!" }
```

### 密钥格式

密钥应以十六进制格式提供：
- 公钥：64 字符十六进制字符串（未压缩格式，不含 '04' 前缀）
- 私钥：64 字符十六进制字符串

## 资源

* [n8n 社区节点文档](https://docs.n8n.io/integrations/#community-nodes)
* [SM2 密码算法规范](https://tools.ietf.org/html/draft-shen-sm2-ecdsa-02)
* [sm-crypto 库文档](https://github.com/JuneAndGreen/sm-crypto)

## 许可证

[MIT](LICENSE.md)
