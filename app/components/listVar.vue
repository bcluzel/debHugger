<template>
    <v-card :title="listName" style="background-color: #888">
        <v-card-title>
            {{ listName }}
        </v-card-title>
        <!-- Ajouter un v-bind -->

        <LRow v-for="(value, i) in vars_comp" :key="i">
            <v-text-field hide-details outline :label="i.toString()" :value="value" @input="$emit('input', {$event, i})"> </v-text-field>
            <!-- <v-btn class="xs6" round color="info" block=true>
                <font color="back" style="bold">
                    {{ varName }}
                </font>
            </v-btn>
            <v-btn class="xs6" round color="warning" block=true>
                {{ varValue }}
            </v-btn>
            -->
        </LRow>
    </v-card>
</template>


<script>
import Variable from '@/components/var'

export default {
    name: "BoiteVariable",
    components: {
        'var-comp': Variable
    },
    props: {
        listName: {
            type: String,
            required: true
        },
        vars_comp: {
            type: Array,
            required: true
        }
    },
    event: 'click_deletion'
}
</script>
