export default (options, context) => ({
    extendMarkdown(md) {
        const defaultRender = md.renderer.rules.image;
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const href = token.attrs[token.attrIndex('src')][1];

            // 获取当前 Markdown 文件路径
            const filePath = env.postProcess.filePathStem;

            // 解析当前文件的目录路径
            const dirPath = filePath.substring(filePath.indexOf('/', 1) + 1);

            // 修改图片路径逻辑
            const newHref = href.replace('image/', `https://apzs.eu.org/${dirPath}/image/`);
            token.attrs[token.attrIndex('src')][1] = newHref;

            return defaultRender(tokens, idx, options, env, self);
        };
    },
});

