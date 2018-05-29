<template>
    <Card>
        <p slot="title">
            Things: {{ things.length }}
        </p>
        <!-- Begin: Table of things -->
        <Table :loading="loading" border stripe :columns="columns" :data="things"></Table>
        <!-- End: Table of things -->
    </Card>
</template>

<script>
import { Table, Poptip } from 'iview'
import ThingEdit from './Edit.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
	components: {
		Table, ThingEdit, Poptip
	},
	data() {
		return {
			loading: true,

			columns: [
			{
				type: 'index',
				width: 60,
				align: 'center'
			},
			{
				title: 'Title',
				key: 'name',
				minWidth: 100
			},
			{
				title: 'Detail',
				key: 'info',
				minWidth: 100
			},
			{
				title: 'Operations',
				key: 'operations',
				minWidth: 200,
				align: 'center',
				render: (h, params) => {
					return h('div', [
						h(ThingEdit, {
                            props: {
                                id: this.things[params.index]._id
                            }
                        }),
						h(Poptip, {
							props: {
								transfer: true,
								confirm: true,
								title: 'Are you sure you want to delete this item?'
							},
							on: {
								'on-ok': () => { this.removeThing(this.things[params.index]._id) }
							}
						}, [
							h('Button', {
								props: {
									type: 'error'
								},
							}, 'Delete')
						])
					])
				}
			}]
		}
	},
	computed: {
		...mapGetters(['things'])
	},
    created() {
        this.$store.dispatch('getAllThings').then(() => {
            this.loading = false
        })
    },
	methods: {
        ...mapActions(['removeThing'])
	}
}
</script>