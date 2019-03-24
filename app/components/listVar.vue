<template>
    <div title={{ listName }}>
        <!-- Ajouter un v-bind -->

        <LRow v-for="(value, i) in vars_comp">
            <v-text-field outline :label="i.toString()" :value="value" @input="$emit('input', $event)"> </v-text-field>
            <!-- <v-btn class="xs6" round color="info" block=true>
                <font color="back" style="bold">
                    {{ varName }}
                </font>
            </v-btn>
            <v-btn class="xs6" round color="warning" block=true>
                {{ varValue }}
            </v-btn>
            -->
            <v-btn color="error" icon @click="$emit('click_deletion')">
                <v-icon>
                    delete
                </v-icon>
            </v-btn> 
        </LRow>
    </div>
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
