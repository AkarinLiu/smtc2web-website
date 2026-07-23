<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";

const { Layout } = DefaultTheme;
const { frontmatter, page } = useData();

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

const isPost = () => {
    const url = page.value.filePath;
    return url.startsWith("posts/") && url !== "posts/index.md";
};
</script>

<template>
    <Layout>
        <template #doc-before>
            <div v-if="isPost()" class="post-meta">
                <div class="post-meta-line">
                    <span v-if="frontmatter.date" class="post-date">{{
                        formatDate(frontmatter.date)
                    }}</span>
                    <span v-if="frontmatter.author" class="post-author">{{
                        frontmatter.author
                    }}</span>
                    <span v-if="frontmatter.category" class="post-category">{{
                        frontmatter.category
                    }}</span>
                </div>
                <div v-if="frontmatter.tags" class="post-tags">
                    <span
                        v-for="tag in frontmatter.tags"
                        :key="tag"
                        class="tag"
                        >{{ tag }}</span
                    >
                </div>
            </div>
        </template>
        <template #aside-bottom>
            <div class="bilibili-social-card">
                <h3>关注作者的 B 站账号</h3>
                <img
                    src="/bilibili-social-account.png"
                    alt="哔哩哔哩账号二维码"
                    style="width: 100%; border-radius: 8px"
                />
            </div>
        </template>

    </Layout>
</template>

<style scoped>
.post-meta {
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--vp-c-divider);
}
.post-meta-line {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--vp-c-text-2);
    margin-bottom: 0.75rem;
}
.post-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}
.tag {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 4px;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    border: 1px solid var(--vp-c-divider);
}
</style>
